import pytest
from services.library_service import (
    reset_library_state, get_library_state, add_new_book,
    borrow_book, return_book, calculate_fine, get_solid_breakdown
)

def setup_function():
    """Reset repository before each test."""
    reset_library_state()

def test_initial_state():
    state = get_library_state()
    assert len(state.books) == 5
    assert len(state.members) == 3
    assert state.books[0].id == 101
    assert state.books[0].issued is False

def test_add_book_success_and_duplicate():
    res1 = add_new_book(106, "Refactoring", "Martin Fowler")
    assert res1.success is True
    assert "successfully added" in res1.message

    # Duplicate ID should fail
    res2 = add_new_book(106, "Duplicate Refactoring", "Author")
    assert res2.success is False
    assert "already exists" in res2.message

def test_borrow_book_and_notification():
    # Alice (Student, limit 3) borrows book 101
    res = borrow_book(member_id=1, book_id=101, channel="Email")
    assert res.success is True
    assert res.notification is not None
    assert res.notification.channel == "Email"

    state = get_library_state()
    book = next(b for b in state.books if b.id == 101)
    member = next(m for m in state.members if m.id == 1)
    assert book.issued is True
    assert book.borrower_id == 1
    assert member.borrowed == 1

def test_borrow_limit_enforcement_lsp():
    # Vikram Mehta (Guest) has a limit of 2 books
    assert borrow_book(member_id=3, book_id=101).success is True
    assert borrow_book(member_id=3, book_id=102).success is True
    # Third borrow should be blocked
    res3 = borrow_book(member_id=3, book_id=103)
    assert res3.success is False
    assert "limit reached" in res3.message.lower()

def test_return_book_and_fine_calculation_ocp():
    # Alice borrows book 101
    borrow_book(member_id=1, book_id=101)
    
    # Return with 4 days overdue
    # Student fine rate is ₹2/day -> total = 8.0
    res = return_book(member_id=1, book_id=101, days_overdue=4, channel="SMS")
    assert res.success is True
    assert res.fine_amount == 8.0
    assert res.notification.channel == "SMS"

    # Verify book is available again
    state = get_library_state()
    book = next(b for b in state.books if b.id == 101)
    assert book.issued is False
    assert book.borrower_id is None

def test_fine_rates_across_categories():
    student_fine = calculate_fine("Student", 5)
    assert student_fine.total_fine == 10.0

    faculty_fine = calculate_fine("Faculty", 5)
    assert faculty_fine.total_fine == 5.0

    guest_fine = calculate_fine("Guest", 5)
    assert guest_fine.total_fine == 20.0

def test_solid_breakdown_contains_all_five():
    info = get_solid_breakdown()
    assert len(info["principles"]) == 5
    letters = [p["letter"] for p in info["principles"]]
    assert letters == ["S", "O", "L", "I", "D"]

