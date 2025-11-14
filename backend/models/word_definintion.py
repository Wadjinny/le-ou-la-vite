from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
class dictionary(Base):
    __tablename__ = "dictionary"
    __table_args__ = {"schema": "french_words"}
    id = Column(Integer, primary_key=True)
    word = Column(String)
    genre = Column(String)
    def_text = Column(String)
    def_example = Column(String)