from fastapi import APIRouter, HTTPException
from schemas.library_schema import (
    LibraryStateResponse, OperationResponse, AddBookRequest,
    BorrowBookRequest, ReturnBookRequest, FineCalculationRequest, FineCalculationResponse
)
from services.library_service import (
    get_library_state, reset_library_state, add_new_book,
    borrow_book, return_book, calculate_fine, get_solid_breakdown
)

router = APIRouter(prefix="/api/library", tags=["Library Management System (SOLID)"])

@router.get("/state", response_model=LibraryStateResponse)
def get_state():
    """Returns current catalog, members, and notification logs."""
    return get_library_state()

@router.post("/reset", response_model=LibraryStateResponse)
def reset_state():
    """Resets library catalog and member state to default benchmark values."""
    return reset_library_state()

@router.post("/add-book", response_model=OperationResponse)
def add_book_endpoint(payload: AddBookRequest):
    """SRP: Adds a book to storage inventory."""
    return add_new_book(book_id=payload.id, title=payload.title, author=payload.author or "Academic Press")

@router.post("/borrow", response_model=OperationResponse)
def borrow_endpoint(payload: BorrowBookRequest):
    """LSP & DIP: Borrows book with member limit check and dynamic notification."""
    return borrow_book(
        member_id=payload.member_id,
        book_id=payload.book_id,
        channel=payload.notification_channel or "Email"
    )

@router.post("/return", response_model=OperationResponse)
def return_endpoint(payload: ReturnBookRequest):
    """OCP: Returns book and calculates overdue fine based on member rate policy."""
    return return_book(
        member_id=payload.member_id,
        book_id=payload.book_id,
        days_overdue=payload.days_overdue,
        channel=payload.notification_channel or "Email"
    )

@router.post("/calculate-fine", response_model=FineCalculationResponse)
def fine_endpoint(payload: FineCalculationRequest):
    """OCP: Calculates fine for a given member category and overdue days."""
    try:
        return calculate_fine(category=payload.category, days_overdue=payload.days_overdue)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/solid-info")
def get_solid_info():
    """Returns detailed mapping of the 5 SOLID principles to the Library Architecture."""
    return get_solid_breakdown()
