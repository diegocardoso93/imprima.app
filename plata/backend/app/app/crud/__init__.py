from .crud_item import item
from .crud_user import user
from .crud_kind import kind
from .crud_product import product
from .crud_type import ttype
from .crud_category import category
from .crud_merchant import merchant
from .crud_merchant_type_attribute import merchant_type_attribute
from .crud_order import order
from .crud_order_item import order_item

# For a new basic set of CRUD operations you could just do

# from .base import CRUDBase
# from app.models.item import Item
# from app.schemas.item import ItemCreate, ItemUpdate

# item = CRUDBase[Item, ItemCreate, ItemUpdate](Item)
