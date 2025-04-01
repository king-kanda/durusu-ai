from fastapi import APIRouter, Response, status

from ds.core.llm.main import LoadChat
from ds.core.models.message import UserMessage


router = APIRouter(
    prefix="/admin/users", tags=["users"], responses={404: {"description": "Not found"}}
)


@router.post("chat/send")
async def send_chat_llm(request: UserMessage, http_response: Response):

    load_chat = LoadChat("suihizshis")
    chat_response = load_chat.get_response(request.message)
    if chat_response is None:
        http_response.status_code = status.HTTP_400_BAD_REQUEST

    return chat_response
