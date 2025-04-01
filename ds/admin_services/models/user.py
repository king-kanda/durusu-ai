from pydantic import BaseModel

class ListUsers(BaseModel):
    name:str
    email:str
    