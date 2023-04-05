import { EventEmitter } from 'events';
import { 
    emitProductAdded, 
    emitProductRemoved, 
    emitProductExpired, 
    emitProductPurchased, 
    emitCategoryAdded,
    emitUpdatePassword, 
} from '../controllers/Auth/notificationsContrloller';
const emitter = new EventEmitter();

emitter.on('newProduct', emitProductAdded);
emitter.on('productRemoved', emitProductRemoved)
emitter.on('productExpired', emitProductExpired)
emitter.on('productPurchased', emitProductPurchased)
emitter.on('newCategoryAdded', emitCategoryAdded)
emitter.on('updatePassword', emitUpdatePassword)

export default emitter;
