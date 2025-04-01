from fastapi import APIRouter
from ds.admin_services.controllers import usersController , messageController

router=APIRouter()

router.include_router(usersController.router)
router.include_router(messageController.router)