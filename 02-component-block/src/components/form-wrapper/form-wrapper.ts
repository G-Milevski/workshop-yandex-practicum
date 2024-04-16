import Block from "../../core/Block";

export default class FormWrapper extends Block {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        `      <Form class="form">
                    <p class="form-title">{{title}}</p>
                    <div class="form-content">
                        {{{ formBody }}} 
                    </div>
                </Form>`
        )
    }
}
