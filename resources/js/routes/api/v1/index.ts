import sync from './sync'
import publicMethod from './public'
import admin from './admin'
const v1 = {
    sync: Object.assign(sync, sync),
public: Object.assign(publicMethod, publicMethod),
admin: Object.assign(admin, admin),
}

export default v1