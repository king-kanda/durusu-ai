from fastapi import APIRouter, Request, Response

router = APIRouter(
    prefix="/admin/users", tags=["users"], responses={404: {"description": "Not found"}}
)


@router.post("/users/list")
async def list_users():
    pass
