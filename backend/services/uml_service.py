from schemas.uml_schema import (
    UMLClassModel, ClassAttribute, ClassMethod, UMLRelationship,
    SequenceMessage, FoodOrderingUMLResponse
)

def get_food_ordering_uml() -> FoodOrderingUMLResponse:
    classes = [
        UMLClassModel(
            name="Person",
            stereotype="Abstract Superclass",
            attributes=[
                ClassAttribute(name="id", type="int", visibility="#"),
                ClassAttribute(name="name", type="string", visibility="+"),
                ClassAttribute(name="email", type="string", visibility="+"),
                ClassAttribute(name="phone", type="string", visibility="+"),
            ],
            methods=[
                ClassMethod(name="login()", return_type="bool", visibility="+"),
                ClassMethod(name="logout()", return_type="void", visibility="+"),
            ]
        ),
        UMLClassModel(
            name="Customer",
            parent="Person",
            attributes=[
                ClassAttribute(name="address", type="string", visibility="+"),
                ClassAttribute(name="cardnum", type="int", visibility="#"),
            ],
            methods=[
                ClassMethod(name="create()", return_type="void", visibility="#"),
                ClassMethod(name="browseMenu()", return_type="List<Dish>", visibility="+"),
                ClassMethod(name="placeOrder(items)", return_type="Order", visibility="+"),
            ]
        ),
        UMLClassModel(
            name="RestaurantOwner",
            parent="Person",
            attributes=[
                ClassAttribute(name="businessRegNo", type="string", visibility="-"),
            ],
            methods=[
                ClassMethod(name="manageMenu()", return_type="void", visibility="+"),
                ClassMethod(name="acceptOrder(orderId)", return_type="bool", visibility="+"),
            ]
        ),
        UMLClassModel(
            name="Admin",
            parent="Person",
            attributes=[
                ClassAttribute(name="username", type="string", visibility="-"),
                ClassAttribute(name="password", type="string", visibility="-"),
            ],
            methods=[
                ClassMethod(name="create()", return_type="void", visibility="+"),
                ClassMethod(name="update()", return_type="void", visibility="+"),
            ]
        ),
        UMLClassModel(
            name="Restaurant",
            attributes=[
                ClassAttribute(name="id", type="int", visibility="#"),
                ClassAttribute(name="name", type="string", visibility="+"),
                ClassAttribute(name="address", type="string", visibility="+"),
                ClassAttribute(name="contactnum", type="string", visibility="+"),
            ],
            methods=[
                ClassMethod(name="update()", return_type="void", visibility="+"),
                ClassMethod(name="viewOrders()", return_type="List<Order>", visibility="+"),
            ]
        ),
        UMLClassModel(
            name="Menu",
            attributes=[
                ClassAttribute(name="id", type="int", visibility="#"),
                ClassAttribute(name="details", type="string", visibility="+"),
                ClassAttribute(name="listofdish", type="string", visibility="+"),
            ],
            methods=[
                ClassMethod(name="add()", return_type="void", visibility="+"),
                ClassMethod(name="update()", return_type="void", visibility="+"),
            ]
        ),
        UMLClassModel(
            name="Dish",
            attributes=[
                ClassAttribute(name="id", type="int", visibility="#"),
                ClassAttribute(name="names", type="string", visibility="+"),
                ClassAttribute(name="price", type="float", visibility="+"),
            ],
            methods=[
                ClassMethod(name="add()", return_type="void", visibility="+"),
                ClassMethod(name="update()", return_type="void", visibility="+"),
            ]
        ),
        UMLClassModel(
            name="Order",
            attributes=[
                ClassAttribute(name="id", type="int", visibility="#"),
                ClassAttribute(name="details", type="string", visibility="+"),
                ClassAttribute(name="ordertype", type="string", visibility="+"),
                ClassAttribute(name="totalAmount", type="float", visibility="+"),
            ],
            methods=[
                ClassMethod(name="processDebit()", return_type="void", visibility="+"),
                ClassMethod(name="cancelOrder()", return_type="bool", visibility="+"),
            ]
        ),
        UMLClassModel(
            name="Payment",
            attributes=[
                ClassAttribute(name="id", type="int", visibility="+"),
                ClassAttribute(name="cardnumber", type="string", visibility="+"),
                ClassAttribute(name="amount", type="float", visibility="+"),
                ClassAttribute(name="status", type="string", visibility="+"),
            ],
            methods=[
                ClassMethod(name="add()", return_type="void", visibility="+"),
                ClassMethod(name="update()", return_type="void", visibility="+"),
                ClassMethod(name="processPayment()", return_type="bool", visibility="+"),
            ]
        ),
        UMLClassModel(
            name="Delivery",
            attributes=[
                ClassAttribute(name="id", type="int", visibility="#"),
                ClassAttribute(name="name", type="string", visibility="+"),
                ClassAttribute(name="date", type="string", visibility="+"),
                ClassAttribute(name="address", type="string", visibility="+"),
                ClassAttribute(name="status", type="string", visibility="+"),
            ],
            methods=[
                ClassMethod(name="update()", return_type="void", visibility="+"),
                ClassMethod(name="assignAgent()", return_type="void", visibility="+"),
            ]
        ),
    ]

    relationships = [
        UMLRelationship(source="Customer", target="Person", type="Generalization", label="is-a"),
        UMLRelationship(source="RestaurantOwner", target="Person", type="Generalization", label="is-a"),
        UMLRelationship(source="Admin", target="Person", type="Generalization", label="is-a"),
        UMLRelationship(source="Customer", target="Order", type="Association", multiplicity_source="1", multiplicity_target="*", label="places"),
        UMLRelationship(source="Restaurant", target="Menu", type="Composition", multiplicity_source="1", multiplicity_target="1", label="contains"),
        UMLRelationship(source="Menu", target="Dish", type="Aggregation", multiplicity_source="1", multiplicity_target="*", label="lists"),
        UMLRelationship(source="Order", target="Restaurant", type="Association", multiplicity_source="*", multiplicity_target="1", label="fulfilled by"),
        UMLRelationship(source="Order", target="Payment", type="Composition", multiplicity_source="1", multiplicity_target="1", label="settled by"),
        UMLRelationship(source="Order", target="Delivery", type="Composition", multiplicity_source="1", multiplicity_target="1", label="dispatched via"),
    ]

    sequence_diagram = [
        SequenceMessage(
            step=1, sender="Customer", receiver="System", message="browseMenu()",
            type="synchronous", description="Customer requests available restaurant menu items."
        ),
        SequenceMessage(
            step=2, sender="System", receiver="Customer", message="menuList",
            type="return", description="System presents catalogue of dishes and prices."
        ),
        SequenceMessage(
            step=3, sender="Customer", receiver="System", message="placeOrder(items)",
            type="synchronous", description="Customer selects meal items and confirms order intent."
        ),
        SequenceMessage(
            step=4, sender="System", receiver="Restaurant", message="sendOrder(order)",
            type="synchronous", description="System transmits order specifics to restaurant kitchen."
        ),
        SequenceMessage(
            step=5, sender="Restaurant", receiver="System", message="orderAccepted",
            type="return", description="Restaurant kitchen confirms availability and begins preparation."
        ),
        SequenceMessage(
            step=6, sender="System", receiver="Payment", message="processPayment(amount)",
            type="synchronous", description="System transmits billing total to payment gateway."
        ),
        SequenceMessage(
            step=7, sender="Payment", receiver="System", message="paymentSuccess",
            type="return", description="Payment gateway confirms financial authorization."
        ),
        SequenceMessage(
            step=8, sender="System", receiver="Delivery Person", message="assignDelivery(order)",
            type="asynchronous", description="System assigns available courier rider for pickup."
        ),
        SequenceMessage(
            step=9, sender="Delivery Person", receiver="System", message="updateStatus(delivered)",
            type="asynchronous", description="Courier rider completes drop-off and marks delivered."
        ),
        SequenceMessage(
            step=10, sender="System", receiver="Customer", message="notifyDelivered()",
            type="asynchronous", description="System transmits push/SMS confirmation to customer."
        )
    ]

    theory = {
        "title": "UML Structural & Behavioral Modeling: Online Food Ordering System",
        "class_diagram_purpose": "Depicts the static structural architecture of classes, attributes, visibility modifiers (+ public, - private, # protected), and relationships (Generalization, Association, Composition, Aggregation).",
        "sequence_diagram_purpose": "Depicts dynamic object interaction over time, showing actors, lifelines, activation bars, and chronological message flow from menu browsing to final delivery."
    }

    return FoodOrderingUMLResponse(
        system_name="Online Food Ordering System",
        classes=classes,
        relationships=relationships,
        sequence_diagram=sequence_diagram,
        theory=theory
    )

