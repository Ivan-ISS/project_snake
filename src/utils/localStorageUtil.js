class LocalSrorageUtil {
    constructor(keyName) {
        this.keyName = keyName;
    }

    saveData(data) {
        try {
            const serializedState = JSON.stringify(data);
            localStorage.setItem(this.keyName, serializedState);
        } catch (error) {
            console.log(error);
        }
    }

    loadData() {
        try {
            const serializedState = localStorage.getItem(this.keyName);
            if (serializedState !== null) {
                return JSON.parse(serializedState);
            }
            return undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}

const localSrorageUtil = new LocalSrorageUtil('key');
localSrorageUtil.saveData(15);
