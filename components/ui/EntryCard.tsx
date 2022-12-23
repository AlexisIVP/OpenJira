import { DragEvent,FC,useContext } from "react";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { UIContext } from '../../context/ui/UIContext';
import { Entry } from "../../interfaces"


interface Props{
    entry:Entry;
}

export const EntryCard:FC<Props>= ({entry}) => {

    const {startDragging, endDragging} = useContext(UIContext);

const onDragStart=(event:DragEvent)=>{

    //todo:modificar el estado, para indicar que estoy haciendo drag
    event.dataTransfer.setData('text',entry._id);
    startDragging();

}

const onDragEnd=()=>{
    //todo:final del drag
    endDragging();
}

  return (
    <Card sx={{marginButton:1 }} 
    //Eventos de drag
    draggable
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace:'pre-line'}}>{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display:'flex',justifyContent:'end',paddingRight:2}}>
                <Typography variant="body2">hace 30 minutos</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
