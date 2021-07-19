import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  AsyncStorage,
} from "react-native";

interface DataForm {
  id: number;
  temp: string;
  date: string;
}

type Data = string | null | void;

const Temp: React.FC = (): JSX.Element => {
  const [temperature, setTemperature] = useState("");
  const [buttonState, setButtonState] = useState(false);
  let [storage, setStorage]: [DataForm[], Function] = useState([]);
  let ArrayOfData: DataForm[] = [];
  const [handler, setHandler] = useState(1);
  let id = Math.random();
  const date = new Date();

  useEffect(() => {
    fetchTemperatureStorage();
  }, [handler]);

  async function fetchTemperatureStorage() {
    storage.length = 0;
    const data: Data = await AsyncStorage.getAllKeys().then((el: any) => {
      AsyncStorage.multiGet(el).then((e) => {
        for (let i = 0; i < e.length; i++) {
          if (e[i][0].includes("Temp:")) {
            const parsed = JSON.parse(e[i][1]);
            ArrayOfData.push(parsed);
          }
        }
        setStorage(ArrayOfData);
      });
    });
  }

  const onButtonClick = () => {
    AsyncStorage.setItem(
      `Temp:${temperature}`,
      JSON.stringify({
        temp: temperature,
        id: id,
        date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}|| ${date.getHours()}:${date.getMinutes()}`,
      }),
      () => {
        setHandler((prev) => prev + 1);
      }
    );
    setHandler((prev) => prev + 1);
  };

  const onTempDelete = (item: string) => {
    AsyncStorage.removeItem(item, () => {
      setHandler((prev) => prev + 1);
    });
    storage.filter((el) => el.temp === item);
    setHandler((prev) => prev + 1);
  };

  const renderList = () => {
    return storage.map((el: DataForm, index: number) => {
      return (
        <View key={index} style={styles.ItemContainer}>
          <Text style={styles.itemText}>|Temperature|: {el.temp}</Text>
          <Text style={styles.itemText}>|Date|: {el.date}</Text>
          <Pressable
            style={styles.todoContainer}
            onPress={() => onTempDelete(`Temp:${el.temp}`)}
          >
            <Text style={styles.todo}>Удалить</Text>
          </Pressable>
        </View>
      );
    });
  };

  return (
    <View>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Введите текущую температуру"
          value={temperature}
          onChangeText={(e) => {
            setTemperature(e);
          }}
        />
        <Pressable
          style={!buttonState ? styles.buttonContainer : styles.clicked}
          onPress={onButtonClick}
          onTouchStart={() => {
            setButtonState(true);
          }}
          onTouchEnd={() => {
            setButtonState(false);
          }}
        >
          <Text style={styles.buttonText}>Применить</Text>
        </Pressable>
        <ScrollView style={styles.container} horizontal>
          {renderList() ? (
            renderList()
          ) : (
            <Text style={styles.loading}>Loading...</Text>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
    fontSize: 18,
  },
  buttonContainer: {
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
  clicked: {
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
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  todo: {
    color: "white",
    alignSelf: "center",
  },
  todoContainer: {
    color: "white",
    backgroundColor: "blue",
    width: 340,
    alignSelf: "center",
    borderWidth: 4,
    borderColor: "blue",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 30,
    marginTop: 235,
  },
  ItemContainer: {
    borderWidth: 2,
    borderColor: "white",
    resizeMode: "contain",
    width: 360,
    height: 340,
  },
  itemText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  loading: {
    color: "white",
  },
});

export default Temp;
