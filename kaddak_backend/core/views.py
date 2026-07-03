from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "status": "ok", 
        "message": "Bienvenido a la API de Kaddak",
        "endpoints": [
            "/api/menu/",
            "/api/orders/",
            "/api/users/"
        ]
    })
