import datetime
from typing import Dict, List, Optional
from schemas.library_schema import (
    BookModel, MemberModel, NotificationLog, LibraryStateResponse,
    OperationResponse, FineCalculationResponse
)

# Open/Closed Principle (OCP): Fine calculation strategy per category
FINE_POLICIES = {
    "student": {
        "category": "Student",
        "rate": 2.0,
        "limit": 3,
        "rule": "Fine = days_overdue × ₹2 (standard student subsidised rate)"
    },
    "faculty": {
        "category": "Faculty",
        "rate": 1.0,
        "limit": 5,
        "rule": "Fine = days_overdue × ₹1 (discounted faculty rate with higher borrowing capacity)"
    },
    "guest": {
        "category": "Guest",
        "rate": 4.0,
        "limit": 2,
        "rule": "Fine = days_overdue × ₹4 (commercial/guest visitor rate)"
    }
}

class NotifierInterface:
    """Dependency Inversion Principle (DIP): High-level modules depend on abstractions."""
    def send(self, recipient: str, message: str) -> NotificationLog:
        raise NotImplementedError

class EmailNotifier(NotifierInterface):
    def send(self, recipient: str, message: str) -> NotificationLog:
        return NotificationLog(
            channel="Email",
            recipient=recipient,
            message=f"[EMAIL DISPATCH] To: {recipient} | Subject: Library Alert | Body: {message}",
            timestamp=datetime.datetime.now().strftime("%H:%M:%S")
        )

class SMSNotifier(NotifierInterface):
    def send(self, recipient: str, message: str) -> NotificationLog:
        return NotificationLog(
            channel="SMS",
            recipient=recipient,
            message=f"[SMS GATEWAY] To: {recipient} | Msg: {message}",
            timestamp=datetime.datetime.now().strftime("%H:%M:%S")
        )

class LibraryRepository:
    """Single Responsibility Principle (SRP): Manages persistence & book inventory separately."""
    def __init__(self):
        self.reset()

    def reset(self):
        self.books: Dict[int, BookModel] = {
            101: BookModel(id=101, title="Software Engineering: A Practitioner's Approach", author="Roger S. Pressman", issued=False),
            102: BookModel(id=102, title="Clean Code: A Handbook of Agile Craftsmanship", author="Robert C. Martin", issued=False),
            103: BookModel(id=103, title="Design Patterns: Elements of Reusable OO Software", author="Gang of Four", issued=False),
            104: BookModel(id=104, title="Introduction to Algorithms (CLRS)", author="Cormen, Leiserson, Rivest", issued=False),
            105: BookModel(id=105, title="The Pragmatic Programmer", author="David Thomas, Andrew Hunt", issued=False),
        }
        self.members: Dict[int, MemberModel] = {
            1: MemberModel(id=1, name="Alice Sharma", category="Student", limit=3, borrowed=0, fine_per_day=2.0),
            2: MemberModel(id=2, name="Dr. Rajesh Mani", category="Faculty", limit=5, borrowed=0, fine_per_day=1.0),
            3: MemberModel(id=3, name="Vikram Mehta", category="Guest", limit=2, borrowed=0, fine_per_day=4.0),
        }
        self.notifications: List[NotificationLog] = [
            NotificationLog(channel="System", recipient="System Admin", message="Library Management System initialised with SOLID architecture.", timestamp="10:00:00")
        ]
        self.active_channel = "Email"

# Singleton Repository Instance
repo = LibraryRepository()

def get_notifier(channel: str) -> NotifierInterface:
    """Dependency Injection helper returning concrete notifier via abstraction."""
    if channel.lower() == "sms":
        return SMSNotifier()
    return EmailNotifier()

def get_library_state() -> LibraryStateResponse:
    return LibraryStateResponse(
        books=list(repo.books.values()),
        members=list(repo.members.values()),
        notifications=repo.notifications,
        active_notifier=repo.active_channel
    )

def reset_library_state() -> LibraryStateResponse:
    repo.reset()
    return get_library_state()

def add_new_book(book_id: int, title: str, author: str = "Academic Press") -> OperationResponse:
    """SRP: Add book operation only manipulates storage."""
    if book_id in repo.books:
        return OperationResponse(
            success=False,
            message=f"Book ID {book_id} already exists in library catalog.",
            solid_principle="Single Responsibility Principle (SRP): Prevented duplicate catalog entry."
        )
    
    new_book = BookModel(id=book_id, title=title, author=author, issued=False)
    repo.books[book_id] = new_book
    return OperationResponse(
        success=True,
        message=f"Book '{title}' (ID: {book_id}) successfully added to catalog.",
        solid_principle="Single Responsibility Principle (SRP): Dedicated storage API handles inventory isolation."
    )

def calculate_fine(category: str, days_overdue: int) -> FineCalculationResponse:
    """Open/Closed Principle (OCP): Calculate fine using polymorphic rate strategies."""
    cat_key = category.strip().lower()
    if cat_key not in FINE_POLICIES:
        raise ValueError(f"Unknown member category '{category}'. Available: Student, Faculty, Guest.")
    
    policy = FINE_POLICIES[cat_key]
    rate = policy["rate"]
    total_fine = max(0, days_overdue) * rate

    formula_str = f"{days_overdue} days × ₹{rate:.2f}/day = ₹{total_fine:.2f}"
    return FineCalculationResponse(
        category=policy["category"],
        rate_per_day=rate,
        days_overdue=days_overdue,
        total_fine=total_fine,
        formula=formula_str,
        principle_applied="Open/Closed Principle (OCP): Strategy pattern allows adding new member categories without modifying core logic."
    )

def borrow_book(member_id: int, book_id: int, channel: str = "Email") -> OperationResponse:
    """
    Orchestrates borrowing while maintaining:
    - SRP: Inventory validation and state update.
    - LSP: All Member categories respect their respective borrowing limits seamlessly.
    - DIP: Notifier dispatched through abstract interface.
    """
    if member_id not in repo.members:
        return OperationResponse(
            success=False,
            message=f"Member ID {member_id} not registered in system.",
            solid_principle="Validation"
        )
    if book_id not in repo.books:
        return OperationResponse(
            success=False,
            message=f"Book ID {book_id} not found in catalog.",
            solid_principle="Validation"
        )
    
    member = repo.members[member_id]
    book = repo.books[book_id]

    if book.issued:
        return OperationResponse(
            success=False,
            message=f"Book '{book.title}' is already issued to {book.borrower_name} (ID: {book.borrower_id}).",
            solid_principle="Single Responsibility Principle (SRP): Inventory state guarded."
        )

    # Liskov Substitution Principle (LSP): Subtypes have different capacity limits but conform to Member contract
    if member.borrowed >= member.limit:
        return OperationResponse(
            success=False,
            message=f"Borrowing limit reached for {member.category} '{member.name}'. Maximum allowed: {member.limit} books.",
            solid_principle="Liskov Substitution Principle (LSP): Distinct member subtypes adhere uniformly to the polymorphic limit check."
        )

    # Update states
    book.issued = True
    book.borrower_id = member.id
    book.borrower_name = member.name
    member.borrowed += 1

    # Dependency Inversion Principle (DIP): Send notification via injected Notifier
    notifier = get_notifier(channel)
    notification = notifier.send(
        recipient=member.name,
        message=f"You borrowed '{book.title}'. Return within 14 days to avoid overdue fees."
    )
    repo.notifications.append(notification)
    repo.active_channel = channel

    return OperationResponse(
        success=True,
        message=f"Book '{book.title}' successfully issued to {member.name} ({member.category}).",
        solid_principle="Liskov Substitution (LSP) + Dependency Inversion (DIP): Polished loan execution with decoupled notifier dispatch.",
        notification=notification
    )

def return_book(member_id: int, book_id: int, days_overdue: int = 0, channel: str = "Email") -> OperationResponse:
    """
    Handles book returns, calculates overdue fine via OCP, and dispatches DIP alert.
    """
    if member_id not in repo.members:
        return OperationResponse(success=False, message="Invalid member ID.", solid_principle="Validation")
    if book_id not in repo.books:
        return OperationResponse(success=False, message="Invalid book ID.", solid_principle="Validation")

    member = repo.members[member_id]
    book = repo.books[book_id]

    if not book.issued or book.borrower_id != member_id:
        return OperationResponse(
            success=False,
            message=f"Book '{book.title}' is not currently on loan to {member.name}.",
            solid_principle="SRP: State validation"
        )

    # Calculate fine using OCP strategy
    fine_resp = calculate_fine(member.category, days_overdue)
    fine_amt = fine_resp.total_fine

    # Reset book state
    book.issued = False
    book.borrower_id = None
    book.borrower_name = None
    member.borrowed = max(0, member.borrowed - 1)

    # DIP Notification
    notifier = get_notifier(channel)
    fine_note = f" Late fee assessed: ₹{fine_amt:.2f} ({days_overdue} days)." if fine_amt > 0 else " No late fine."
    notification = notifier.send(
        recipient=member.name,
        message=f"Returned '{book.title}'.{fine_note}"
    )
    repo.notifications.append(notification)

    msg = f"Book '{book.title}' returned by {member.name}."
    if fine_amt > 0:
        msg += f" Overdue fee charged: ₹{fine_amt:.2f} ({fine_resp.formula})."
    else:
        msg += " Returned on time (₹0 fine)."

    return OperationResponse(
        success=True,
        message=msg,
        solid_principle="Open/Closed Principle (OCP) + Dependency Inversion (DIP): Fine calculated via rate policy and alert dispatched.",
        notification=notification,
        fine_amount=fine_amt
    )

def get_solid_breakdown():
    return {
        "title": "SOLID Principles in Object-Oriented Software Design",
        "case_study": "Library Management System (Lab Manual Practical No. 4)",
        "principles": [
            {
                "letter": "S",
                "name": "Single Responsibility Principle (SRP)",
                "description": "A class or module should have only one reason to change. Each component handles a single concern.",
                "implementation": "Book Storage, Member Management, Fine Strategy, and Notifications are completely segregated into distinct classes.",
                "benefit": "Changes to fine calculation formulas never risk corrupting catalog inventory or borrowing tracking."
            },
            {
                "letter": "O",
                "name": "Open/Closed Principle (OCP)",
                "description": "Software entities should be open for extension, but closed for modification.",
                "implementation": "Fine calculation uses the Strategy Pattern with function pointers / polymorphic handlers (Student: ₹2/d, Faculty: ₹1/d, Guest: ₹4/d).",
                "benefit": "New member tiers (e.g. Research Scholars, Alumni) can be added without modifying the core book loan code."
            },
            {
                "letter": "L",
                "name": "Liskov Substitution Principle (LSP)",
                "description": "Subtypes must be substitutable for their base types without altering program correctness.",
                "implementation": "Student, Faculty, and Guest instances all conform identically to the Member contract while enforcing their custom limits (3, 5, 2).",
                "benefit": "The borrowing workflow treats all members polymorphically without fragile if-else type checks."
            },
            {
                "letter": "I",
                "name": "Interface Segregation Principle (ISP)",
                "description": "Clients should not be forced to depend on interfaces they do not use.",
                "implementation": "StorageAPI (Add, Find, List), NotifierInterface (Send), and FineCalculator are separate, focused interfaces.",
                "benefit": "A console logger or notification handler doesn't need to implement book database queries."
            },
            {
                "letter": "D",
                "name": "Dependency Inversion Principle (DIP)",
                "description": "High-level modules should not depend on low-level modules; both should depend on abstractions.",
                "implementation": "The high-level Library controller depends on the abstract NotifierInterface, allowing runtime switching between Email and SMS.",
                "benefit": "Low-level messaging protocols can be upgraded without changing business logic."
            }
        ]
    }

