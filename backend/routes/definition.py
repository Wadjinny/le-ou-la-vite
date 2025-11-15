from fastapi import APIRouter, HTTPException
from backend.db import get_conn
from sqlalchemy import text
from backend.models.word_definintion import dictionary
from fastapi import Depends
from sqlalchemy.orm import Session
from backend.utils import setup_logging

logger = setup_logging(__name__)
router = APIRouter()



@router.get("/definition")
async def get_definition(word: str,db:Session=Depends(get_conn)):
    query = """
        with a as (
            Select 
                word,
                genre,
                def_text,
                ARRAY_AGG(def_example) examples
            from french_words.dictionary 
            where word = :word
            GROUP BY 1,2,3
        )
        SELECT 
            word,
            genre,
            ARRAY_AGG(json_build_object(
                'definition',def_text,
                'examples', examples
            )) definitions
        from a
        GROUP BY 1,2
        ;
        """
    result = db.execute(text(query), {"word": word}).fetchone()
    if not result:
        raise HTTPException(status_code=404, detail=f"Word {word} not found")
    result_dict = {
        "word": result.word,
        "genre": result.genre,
        "definitions": result.definitions
    }
    return result_dict  