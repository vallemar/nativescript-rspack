import { Utils } from "@nativescript/core";

class MyButton extends android.widget.Button {
  myClass = true;
  constructor() {
    super(Utils.android.getApplicationContext());

    // necessary when extending TypeScript constructors
    return global.__native(this);
  }

  onClick() {
    this.setOnClickListener(new ClickListener());
  }
  setEnabled(enabled: boolean): void {
    this.super.setEnabled(enabled);
  }
}

@NativeClass
@Interfaces([android.view.View.OnClickListener])
class ClickListener
  extends java.lang.Object
  implements android.view.View.OnClickListener
{
  myClassInterface = true;
  constructor() {
    super();

    // necessary when extending TypeScript constructors
    return global.__native(this);
  }

  onClick(view: android.view.View): void {
    console.log("Button clicked!");
  }
}
/* 
@NativeClass
@JavaProxy("org.nativescript.example.MyClass")
class MyClass extends java.lang.Object {
  // constructor
  constructor() {
    super();
    // necessary when extending TypeScript constructors
    return global.__native(this);
  }

  toString(): string {
    // override Object's toString
    return "";
  }
}

const myClassInstance = new MyClass(); */
export { ClickListener, MyButton };
