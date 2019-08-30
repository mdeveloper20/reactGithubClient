import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics} from '../../Themes'


export default StyleSheet.create({
    ...ApplicationStyles.screen,
    input: {
        width: Metrics.viewWidths.full,
        alignSelf: 'center',
        marginTop: Metrics.marginVertical
    },

})
