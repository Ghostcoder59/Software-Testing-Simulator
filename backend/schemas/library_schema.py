from pydantic import BaseModel, Field
from typing import List, Optional

class BookModel(BaseModel):
    id: int
    title: str
    author: Optional[str] = "Unknown"
    issued: bool = False
    borrower_id: Optional[int] = None
    borrower_name: Optional[str] = None

class MemberModel(BaseModel):
    id: int
    name: str
    category: str = Field(..., description="'Student', 'Faculty', or 'Guest'")
    limit: int
    borrowed: int = 0
    fine_per_day: float

class AddBookRequest(BaseModel):
    id: int = Field(..., gt=0)
    title: str = Field(..., min_length=1)
    author: Optional[str] = "Academic Press"

class BorrowBookRequest(BaseModel):
    member_id: int
    book_id: int
    notification_channel: Optional[str] = Field(default="Email", description="'Email' or 'SMS'")

class ReturnBookRequest(BaseModel):
    member_id: int
    book_id: int
    days_overdue: int = Field(default=0, ge=0)
    notification_channel: Optional[str] = Field(default="Email", description="'Email' or 'SMS'")

class FineCalculationRequest(BaseModel):
    category: str = Field(..., description="'Student', 'Faculty', or 'Guest'")
    days_overdue: int = Field(..., ge=0)

class FineCalculationResponse(BaseModel):
    category: str
    rate_per_day: float
    days_overdue: int
    total_fine: float
    formula: str
    principle_applied: str

class NotificationLog(BaseModel):
    channel: str
    recipient: str
    message: str
    timestamp: str

class LibraryStateResponse(BaseModel):
    books: List[BookModel]
    members: List[MemberModel]
    notifications: List[NotificationLog]
    active_notifier: str

class OperationResponse(BaseModel):
    success: bool
    message: str
    solid_principle: str
    notification: Optional[NotificationLog] = None
    fine_amount: Optional[float] = 0.0
