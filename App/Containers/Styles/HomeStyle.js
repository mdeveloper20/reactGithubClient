import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors,ApplicationStyles} from '../../Themes/'



export default StyleSheet.create({
  ...ApplicationStyles.screen,
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: Colors.silver
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  input: {
    width:Metrics.viewWidths.full,
    alignSelf:'center',
},

})
