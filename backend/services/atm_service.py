from schemas.atm_schema import (
    ActorInfo, UseCaseInfo, RelationshipInfo, ATMUseCaseDiagramResponse
)

def get_atm_use_case_data() -> ATMUseCaseDiagramResponse:
    actors = [
        ActorInfo(
            id="user",
            name="Customer (User)",
            role="Performs banking transactions including cash withdrawal, PIN change, deposits, and transfers.",
            type="Primary Actor"
        ),
        ActorInfo(
            id="bank_server",
            name="Bank Server",
            role="Verifies card/account credentials, authorizes monetary transactions, and confirms available balance.",
            type="Secondary / Backend Actor"
        ),
        ActorInfo(
            id="cash_replenisher",
            name="Cash Replenisher",
            role="Replenishes physical currency cassettes inside the ATM safe.",
            type="Supporting Operational Actor"
        ),
        ActorInfo(
            id="maintenance_tech",
            name="Maintenance Technician",
            role="Executes diagnostic health checks, card reader servicing, and system maintenance.",
            type="Supporting Operational Actor"
        )
    ]

    use_cases = [
        UseCaseInfo(id="uc_change_pin", name="Change PIN", description="Allows cardholder to update their 4-digit security PIN.", primary_actor="Customer"),
        UseCaseInfo(id="uc_auth", name="Authentication with PIN", description="Base security check verifying customer identity.", primary_actor="Customer"),
        UseCaseInfo(id="uc_withdraw", name="Withdraw Cash", description="Core transaction to dispense physical banknotes.", primary_actor="Customer"),
        UseCaseInfo(id="uc_deposit_cash", name="Deposit Cash", description="Accepts and validates cash notes for account crediting.", primary_actor="Customer"),
        UseCaseInfo(id="uc_deposit_cheque", name="Deposit Cheque", description="Scans and deposits bank cheques for clearance.", primary_actor="Customer"),
        UseCaseInfo(id="uc_balance", name="Balance Inquiry", description="Retrieves available and ledger balances from host.", primary_actor="Customer"),
        UseCaseInfo(id="uc_statement", name="Statement Printing", description="Prints mini-statement of recent transactions.", primary_actor="Customer"),
        UseCaseInfo(id="uc_transfer", name="Fund Transfer", description="Transfers money to another designated bank account.", primary_actor="Customer"),
        
        # Included / Extended Use Cases
        UseCaseInfo(id="uc_verify_account", name="Verify Account Details", description="Host lookup to validate account status.", primary_actor="Bank Server"),
        UseCaseInfo(id="uc_auth_funds", name="Authorize Funds", description="Bank server verification of balance and overdraft limit.", primary_actor="Bank Server"),
        UseCaseInfo(id="uc_validate_fund", name="Validate Fund", description="Checks withdrawal amount against daily limits and current balance.", primary_actor="ATM System"),
        UseCaseInfo(id="uc_dispense", name="Dispense Cash", description="Hardware mechanism counting and presenting notes.", primary_actor="ATM System"),
        UseCaseInfo(id="uc_receipt", name="Print Receipt", description="Thermal printer outputs transaction summary.", primary_actor="ATM System"),
        UseCaseInfo(id="uc_validate_cred", name="Validate Credentials", description="Validates destination account for fund transfer.", primary_actor="Bank Server"),
        UseCaseInfo(id="uc_low_balance", name="Low Balance Warning", description="Optional alert displayed if balance drops below minimum threshold.", primary_actor="ATM System"),
        
        # Operational Use Cases
        UseCaseInfo(id="uc_refill", name="Refill ATM Cash", description="Unlocks vault and loads currency cassettes.", primary_actor="Cash Replenisher"),
        UseCaseInfo(id="uc_diagnostics", name="Run Diagnostic", description="Tests network latency, cash sensors, and encryption PIN pad.", primary_actor="Maintenance Technician"),
    ]

    relationships = [
        # Associations (Actors to Use Cases)
        RelationshipInfo(source="user", target="uc_change_pin", type="association"),
        RelationshipInfo(source="user", target="uc_auth", type="association"),
        RelationshipInfo(source="user", target="uc_withdraw", type="association"),
        RelationshipInfo(source="user", target="uc_deposit_cash", type="association"),
        RelationshipInfo(source="user", target="uc_deposit_cheque", type="association"),
        RelationshipInfo(source="user", target="uc_balance", type="association"),
        RelationshipInfo(source="user", target="uc_statement", type="association"),
        RelationshipInfo(source="user", target="uc_transfer", type="association"),

        RelationshipInfo(source="bank_server", target="uc_verify_account", type="association"),
        RelationshipInfo(source="bank_server", target="uc_auth_funds", type="association"),

        RelationshipInfo(source="cash_replenisher", target="uc_refill", type="association"),
        RelationshipInfo(source="maintenance_tech", target="uc_diagnostics", type="association"),

        # <<include>> Relationships
        RelationshipInfo(source="uc_auth", target="uc_verify_account", type="include", label="<<include>>"),
        RelationshipInfo(source="uc_auth", target="uc_auth_funds", type="include", label="<<include>>"),
        RelationshipInfo(source="uc_withdraw", target="uc_validate_fund", type="include", label="<<include>>"),
        RelationshipInfo(source="uc_withdraw", target="uc_dispense", type="include", label="<<include>>"),
        RelationshipInfo(source="uc_withdraw", target="uc_receipt", type="include", label="<<include>>"),
        RelationshipInfo(source="uc_transfer", target="uc_validate_cred", type="include", label="<<include>>"),

        # <<extend>> Relationships
        RelationshipInfo(
            source="uc_low_balance",
            target="uc_withdraw",
            type="extend",
            label="<<extend>>",
            condition="Account balance < ₹1,000 threshold"
        ),
    ]

    theory = {
        "title": "UML Use Case Modeling for ATM Banking System",
        "description": "Represents the functional scope, actors, and behavioral relationships in an automated teller machine.",
        "include_definition": "<<include>>: Mandatory sub-routine. The base use case cannot complete without executing the included use case (e.g. Withdraw Cash MUST include Validate Fund and Dispense Cash).",
        "extend_definition": "<<extend>>: Optional, conditional behavior. Executed only when a specified extension point / condition is satisfied (e.g. Low Balance Warning extends Withdraw Cash only if balance falls below threshold)."
    }

    return ATMUseCaseDiagramResponse(
        system_boundary="ATM System Boundary",
        actors=actors,
        use_cases=use_cases,
        relationships=relationships,
        theory=theory
    )

