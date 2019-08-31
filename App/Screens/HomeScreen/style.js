import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors} from '../../Themes'
import Metrics from "../../Themes/Metrics";


export default StyleSheet.create({
    ...ApplicationStyles.screen,

    headText: {
        fontSize:Metrics.fonts.xl,
        fontWeight:'bold',
        marginBottom:Metrics.doubleBaseMargin,


    },
    textLabel:{
        fontSize:Metrics.fonts.small,
        fontWeight:'bold',
        width:Metrics.viewWidths.big,
        alignSelf: 'center'

    },
    homeContainer: {
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',


    },
    fullInput:{
        width: Metrics.viewWidths.full,
        margin: Metrics.smallMargin
    },
    middleContainer:{
        position:'absolute',
        top:0,
        flex:1,
        width:Metrics.viewWidths.max,
        height:Metrics.viewWidths.max,
        alignItems: 'center',
        justifyContent: 'center'

    },
    innerContainer:{

        borderWidth:1,
        borderColor:Colors.facebook,
        width:Metrics.viewWidths.big,
        alignItems:'center',
        borderRadius:Metrics.buttonRadius,
        padding:Metrics.baseMargin,
        left:0,
        top:0,
        right:0,
        justifyContent: 'center',
        backgroundColor:Colors.ricePaper
    },
    searchButtonStyle:{
        backgroundColor:Colors.bloodOrange

    }

})
