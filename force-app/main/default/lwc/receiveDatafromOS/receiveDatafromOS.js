import { LightningElement,api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
export default class ReceiveDatafromOS extends OmniscriptBaseMixin (LightningElement) {
    @api stepName;
    
    connectedcallback(){
       /* console.log('Inside lwc',this.stepName);
        if(this.omniJsonData?.data){
            console.log('data',this.omniJsonData.data);
        }*/
        var demodata=JSON.parse(this.omniJsonDataStr);
        console.log('demodata',this.demodata);
        console.log('demodata1',demodata);

    }
}