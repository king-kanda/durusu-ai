"""
A Pydantic class model for defining the structure of a user request and message.
"""

from pydantic import BaseModel

class UserMessage(BaseModel):
    """
    Represents a user message with a role and message content.

    Attributes:
        role (str): The role of the user (e.g., "admin", "user", "assistant").
        message (str): The actual message content sent by the user.
    """
    message: str
