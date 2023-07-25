export default class User{
    #telegram = {
        id: null,
        first_name: null,
        username: null,
        chat_id: null
    }
    #not_array = []

    constructor(ctxFrom){
        this.#telegram.id = ctxFrom.id;
        this.#telegram.first_name = ctxFrom.first_name;
        this.#not_array = []
    }

    /*
    NewNotification(newNotification){
        for (let i = 0; i < this.#notification.length; i++) {
            if(this.#notification[i] == newNotification){
                return false;
            }
        }
        this.#notification.push(newNotification);
        return true;
    }
    DeleteNotification(deleteNotification){
        for (let i = 0; i < this.#notification.length; i++) {
            if(this.#notification[i] == deleteNotification){
                this.#notification.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    */
}