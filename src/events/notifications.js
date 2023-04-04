import { EventEmitter } from 'events';
import { 
    emitProductAdded, 
    emitProductRemoved, 
    emitProductExpired, 
    emitProductPurchased, 
    emitCategoryAdded 
} from '../controllers/Auth/notificationsContrloller';
const emitter = new EventEmitter();

emitter.on('newProduct', emitProductAdded);
emitter.on('productRemoved', emitProductRemoved)
emitter.on('productExpired', emitProductExpired)
emitter.on('productPurchased', emitProductPurchased)
emitter.on('newCategoryAdded', emitCategoryAdded)

export default emitter;
