import React, {useEffect, useMemo, useState} from "react";
import { ScrollView } from "react-native";
import { Pressable } from "react-native";
import {View, Text, TextInput, Button, NativeSyntheticEvent, StyleSheet} from "react-native";
import {AsyncStorage} from "react-native";



interface DataForm {
    todo: string,
    id: number
    date: string
}

type Data = string | null | void


const Todo: React.FC = (): JSX.Element => {
const [date, setDate] = useState("")
    const [todo, setTodo] = useState("")
    let [state, setState]: [DataForm[], Function] = useState([])
    let [storage, setStorage]: [DataForm[], Function] = useState([])
    const [buttonState, setButtonState] = useState(false)
    const [handler, setHandler] = useState(1)
    let id = Math.random()
    let ArrayOfData: DataForm[] = []


    useEffect(() => {
fetchStorage();
console.log(fetchStorage())
    },[handler])

    async function fetchStorage() {
            const data: Data = await AsyncStorage.getAllKeys().then((el: any) => {
              AsyncStorage.multiGet(el).then(e => {
                    for (let i = 0;i < e.length; i++) {
                        const parsed = JSON.parse(e[i][1]);
                         ArrayOfData.push(parsed);
                    }
setStorage(ArrayOfData)
                  console.log(storage, 4534)
                })
            })
    }


    const onButtonClick = () => {
    AsyncStorage.setItem(todo, JSON.stringify({todo: todo, id: id, date: date}))
        setHandler(prev => prev + 1)
        console.log(ArrayOfData,3232952)
    }

    const onTodoDelete = (item: string) => {
   AsyncStorage.removeItem(item, () => {
       storage.filter(el => el.todo === item)
   });
   setHandler(prev => prev + 1)
    }

    const renderList = () => {
    console.log(storage, 5150)
        return storage.map((el, index) => {
            console.log(el, 12341284)
            return (
                <View key={el.todo + el.id} style={styles.ItemContainer}>
                    <Text style={styles.itemText}>|Todo|: {el.todo}</Text>
                    <Text style={styles.itemText}>|Date|: {el.date}</Text>
                    <Pressable style={styles.todoContainer} onPress={() => onTodoDelete(el.todo)}>
                        <Text style={styles.todo}>Удалить</Text>
                    </Pressable>
                </View>
            )
        })

    }


    return (
        <ScrollView>
            <TextInput style={styles.input} placeholderTextColor="white" placeholder="Введите Дело" value={todo} onChangeText={text => setTodo(text)}/>
            <TextInput style={styles.input} placeholderTextColor="white" placeholder="Введите время(не обязательно)" value={date} onChangeText={text => setDate(text)}/>
            <Pressable style={!buttonState ? styles.buttonContainer: styles.clicked} onPress={onButtonClick} onTouchStart={() => {setButtonState(true)}} onTouchEnd={() => {setButtonState(false)}}>
                <Text style={styles.buttonText}>Применить</Text>
            </Pressable>
            <ScrollView horizontal>
                {renderList() ? renderList() : <Text style={styles.loading}>Loading...</Text>}
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "grey",
    },

    input: {
        borderWidth: 2,
        borderColor: "white",
        color: "white",
        marginLeft: 20,
        width: 300,
        height: 40,
        paddingLeft: 6,
        marginBottom: 0,
        marginTop: 10,
        fontSize: 18
    },
        buttonContainer: {
        color: "white",
        backgroundColor: "red",
        width: 200,
        alignSelf: "center",
        borderWidth: 4,
        borderColor: "red",
        paddingTop: 7,
        paddingBottom: 7,
        borderRadius: 30,
        marginTop: 15,
        marginBottom: 15,

    },
    clicked: {
        color: "white",
        backgroundColor: "blue",
        width: 200,
        alignSelf: "center",
        borderWidth: 4,
        borderColor: "blue",
        paddingTop: 7,
        paddingBottom: 7,
        borderRadius: 30,
        marginTop: 15,
        marginBottom: 15,
    },
    buttonText: {
        color: "white",
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    todo: {
    color: "white",
        alignSelf: "center"
    },
    todoContainer: {
        color: "white",
        backgroundColor: "red",
        width: 340,
        alignSelf: "center",
        borderWidth: 4,
        borderColor: "red",
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 30,
        marginTop: 190,

    },
    ItemContainer: {
        borderWidth: 2,
        borderColor: "white",
        resizeMode: 'contain',
        width: 360,
        height: 300,
    },
    itemText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    loading: {
        color: "white"
    }

})

export default Todo