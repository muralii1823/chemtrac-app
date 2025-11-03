from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

class TestBase(BaseModel):
    name: str
    description: Optional[str] = None
    version: str = "1.0"
    status: str = "Draft"
    category: Optional[str] = None
    priority: Optional[str] = "Medium"
    testType: Optional[str] = None
    assignedTo: Optional[str] = None
    dueDate: Optional[date] = None
    notes: Optional[str] = None

class TestCreate(TestBase):
    pass

class TestUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    version: Optional[str] = None
    status: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    testType: Optional[str] = None
    assignedTo: Optional[str] = None
    dueDate: Optional[date] = None
    notes: Optional[str] = None

class Test(TestBase):
    id: int
    createdAt: Optional[datetime] = None
    
    class Config:
        from_attributes = True  # Pydantic v2 (orm_mode deprecated)

