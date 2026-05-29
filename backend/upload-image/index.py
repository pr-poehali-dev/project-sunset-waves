import json
import os
import base64
import uuid
import boto3

def handler(event: dict, context) -> dict:
    """Загружает картинку товара в S3 и возвращает публичный URL."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    image_data = body.get('image')
    file_name = body.get('fileName', 'image.jpg')
    content_type = body.get('contentType', 'image/jpeg')

    if not image_data:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Нет данных изображения'})
        }

    # Убираем data URL префикс если есть
    if ',' in image_data:
        image_data = image_data.split(',', 1)[1]

    image_bytes = base64.b64decode(image_data)

    ext = file_name.rsplit('.', 1)[-1].lower() if '.' in file_name else 'jpg'
    key = f"listings/{uuid.uuid4()}.{ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    s3.put_object(
        Bucket='files',
        Key=key,
        Body=image_bytes,
        ContentType=content_type
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': cdn_url})
    }
