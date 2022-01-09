import React from "react";
import "../../../assets/css/ControlCenter/Instruction.scss";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/oceanicNext";

// компонент DisplayingText просто выводит переданный текст с подсветкой кода
class DisplayingText extends React.Component {
    render() {
        const text = this.props.text;

        return (
            <div className={"instruction__text"}>
                <Highlight {...defaultProps} code={text} language="jsx" theme={theme}>
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                        <pre className={"highlight"} style={style}>
                            {tokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })}>
                                    {line.map((token, key) => (
                                        <span {...getTokenProps({ token, key })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>
        );
    }
}

export default DisplayingText;