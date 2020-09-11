import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Caraousel, { Pagination } from 'react-native-snap-carousel'


const pagination = () => {
    const { entries, activeSlide } = this.state;
    return (
        <Pagination
            dotsLength={entries.length}
            activeDotIndex={activeSlide}
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
        />
    );
}
const CarouselImages = ({ images }) => {




    const _renderItem = ({ item }) => {
        const getUrlImage = () => {
            return `http://192.168.0.29:8080/${item.media.path}`;
        }
        return (
            <View style={{ width: 100, height: 200 }}>
                <ImageBackground source={{ uri: getUrlImage() }} style={styles.image} imageStyle={{ borderRadius: 10 }} resizeMode="cover">

                </ImageBackground>
            </View>
        )
    }


    return (
        <View style={{ paddingTop: 35 }}>
            <View>
                <Caraousel
                    renderItem={_renderItem}
                    sliderWidth={200}
                    itemWidth={200}
                    layout={"stack"}
                    data={images}
                />
                {pagination}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 150,
        height: 200,
        borderRadius: 15
    }
});
export default CarouselImages;

