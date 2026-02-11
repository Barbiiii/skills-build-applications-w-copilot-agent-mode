from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def api_root(_request):
    return Response({
        'message': 'Octofit Tracker API root',
    })

