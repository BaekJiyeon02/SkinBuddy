import { StyleSheet, View } from "react-native"
import { colors, width, height, styleG } from '../assets/globalStyles';

export default function Subseperator() {

    return (
        <View style={styles.subseperator}></View>
    )
}
const styles = StyleSheet.create({

    subseperator: {
        backgroundColor: 'grey',
        width: width * 400,
        height: 1,
    }
})