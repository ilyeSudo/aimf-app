
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { showBook, getFavoriteList } from "../../store/reducers/bookRedux";
import BookCard from "../LibraryScreen/BookCard";




const mapStateToProps = (state) => ({
    favoriteList: state.bookStore.favoriteList,
});
const mapDispatchToProps = dispatch => ({
    showBook: (...args) => dispatch(showBook(...args)),
    getFavoriteList: (...args) => dispatch(getFavoriteList(...args)),

});
const renderSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "86%",
                backgroundColor: "#CED0CE",
                marginLeft: "14%",
            }}
        />
    );
};

const BookFavoriteList = ({ favoriteList, getFavoriteList, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (favoriteList) {
            setIsLoading(false);

        } else {
            getFavoriteList();
        }
    }, [favoriteList]);

    const handleShowBook = (item) => {
        showBook(item.id);
        navigation.navigate("BookDetails", { bookId: item.id, bookTitle: item.title });
    };

    const renderItem = ({ item }) => {

        return (
            <BookCard
                data={item}
                showBook={handleShowBook}
                backgroundColor="#ffffff"
            />
        );
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    } else {
        return (
            <SafeAreaView style={{ marginTop: 0 }} >

                <FlatList
                    data={favoriteList}
                    renderItem={renderItem}
                    keyExtractor={(item) => `${item.id}`}
                    ItemSeparatorComponent={renderSeparator}
                    onEndReachedThreshold={0.5}
                />
            </SafeAreaView >
        );
    }

}
BookFavoriteList.navigationOptions = navigationData => {
    return {
        headerTitle: "Liste des favoris",

    };

}

export default connect(mapStateToProps, mapDispatchToProps)(BookFavoriteList);
