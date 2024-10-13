import { LightningElement,api,wire } from 'lwc';
import verifyPhone from "@salesforce/apex/veriPhoneController.verifyPhone";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";

const fields = [PHONE_FIELD];
export default class VerifyPhoneLWC extends LightningElement {
    @api recordId;
  @wire(getRecord, { recordId: "$recordId", fields })
  account;
  @api invoke() {
    let phone = getFieldValue(this.account.data, PHONE_FIELD);
    verifyPhone({ phone: phone })
      .then((result) => {
        if (result.phone_valid === true) {
          let msg =
            "This is a valid phone number from " +
            result.phone_region +
            " having " +
            result.carrier +
            " as carrier.";
          const evt = new ShowToastEvent({
            title: "Valid Phone Number",
            message: msg,
            variant: "success"
          });
          this.dispatchEvent(evt);
        } else {
          const evt = new ShowToastEvent({
            title: "Error",
            message: "Noa a valid phone number !",
            variant: "error"
          });
          this.dispatchEvent(evt);
        }
      })
      .catch((error) => {
        console.log("===>Error during callout : " + JSON.stringify(error));
      });
  }
}
