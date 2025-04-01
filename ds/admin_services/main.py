from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ds.admin_services.routes.api import router as controller_router
import uvicorn 

app = FastAPI ()

origins=["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(controller_router)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0", 
        port=8080,
        log_level="info", 
        reload=True,
        )
    print("running Durusu")
