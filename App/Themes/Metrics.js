import {Dimensions, Platform} from 'react-native'

const {width, height} = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
    marginHorizontal: 10,
    marginVertical: 10,
    section: 25,
    baseMargin: 10,
    doubleBaseMargin: 20,
    smallMargin: 5,
    doubleSection: 50,
    horizontalLineHeight: 1,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    buttonRadius: 4,
    icons: {
        tiny: 15,
        small: 20,
        medium: 30,
        large: 45,
        xl: 50,
        xxl: 75
    },
    images: {
        small: 20,
        medium: 40,
        large: 60,
        logo: 200
    },
    viewWidths: {
        max: '100%',
        full: '90%',
        big: '85%',
        half: '50%',
        small: '25%'
    },
    fonts: {
        mini:9,
        tiny: 12,
        small: 13,
        medium: 18,
        large: 22,
        xl: 28,
        xxl: 30
    }

}

export default metrics
