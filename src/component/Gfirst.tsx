import * as React from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors } from "../styles/colors"
import { Coordinate, Direction, GestureEventType } from "../types/type";
import SView from "./SView";
import { checkGover } from "../utility/CksGover";

const S_INITIAL_POS = [{x:5, y:5}];
const F_INITIAL_POS = {x:5, y:20};
const G_INITIAL_POS = [{xMin:0, xMax:35, yMin:0, yMax:63}];
const M_INITIAL_POS = 50;
const SC_INITIAL_POS = 10;

export default function Gfirst():JSX.Element{
    const [direction, setDirection] = React.useState<Direction>(Direction.Right)
    const [svalues, setSvalues] = React.useState<Coordinate[]>(S_INITIAL_POS)
    const [fvalues, setFvalues] = React.useState<Coordinate>(F_INITIAL_POS)
    const [isgover, setisgover] = React.useState<boolean>(false)
    const [ispaused, setispaused] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(!isgover){
            const intervId = setInterval(() => {
                !ispaused && moveSview();
            },M_INITIAL_POS)
            return () => clearInterval(intervId)
        }
    },[svalues, isgover, ispaused])

    const moveSview = () =>{

        const sViewhade = svalues[0];
        const newsViewHade = {...sViewhade} // Creating a Copy

        if(checkGover(sViewhade, G_INITIAL_POS)){
            setisgover(true);
            return;
        }

        switch(direction){
            case Direction.Up:
                newsViewHade.y -= 1;
                break;
            case Direction.Down:
                newsViewHade.y += 1;
                break;
            case Direction.Left:
                newsViewHade.x -= 1;
                break;
            case Direction.Right:
                newsViewHade.x += 1;
                break;
            default:
                break;
        }

        setSvalues([newsViewHade, ...svalues.slice(0,-1)]);
    };

    const handlerGesture = (event: any) => {
        const {translationX, translationY} = event.nativeEvent;
        if(Math.abs(translationX) > Math.abs(translationY)){
            if(translationX > 0){
                setDirection(Direction.Right)
            }else{
                setDirection(Direction.Left)
            }

        }else{
            if(translationY > 0){
                setDirection(Direction.Down)
            }else{
                setDirection(Direction.Up)
            }
        }
        //console.log(translationX+"       "+translationY)
    };

return(
    <PanGestureHandler onGestureEvent={handlerGesture}>
    <SafeAreaView style = {styles.container}>
        <View style = {styles.boundaries}>
            <SView sview = {svalues}/>
        </View>
    </SafeAreaView>
    </PanGestureHandler>
)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.primary
    },
    boundaries:{
        flex:1,
        borderColor:Colors.primary,
        borderWidth:12,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        backgroundColor:Colors.background,
    }
})