import { Fragment } from "react";
import { Coordinate } from "../types/type";
import { View, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";

interface SViewProps {
    sview:Coordinate[]
}

export default function SView({sview}:SViewProps):JSX.Element{

    return(
        <Fragment>
            {sview.map((segment:Coordinate, index:number) => {
                const segmentStyle ={
                    left:segment.x * 10,
                    top:segment.y * 10,
                }
                return <View key={index} style = {[styles.sview, segmentStyle]}/>
            })}

        </Fragment>
    )
}

const styles = StyleSheet.create({
sview:{
    width:15,
    height:15,
    borderRadius:7,
    backgroundColor:Colors.primary,
    position:"absolute"
}

})