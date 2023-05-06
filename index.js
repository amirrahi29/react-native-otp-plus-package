import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';

class CustomInputOTP extends Component {

    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
        otpLength: PropTypes.number,
        tintColor: PropTypes.string,
        offTintColor: PropTypes.string,
        containerStyle: PropTypes.object,
        cellStyle: PropTypes.object,
        defaultValue: PropTypes.string,
        editable: PropTypes.bool,
        fieldBorderRadius: PropTypes.number,
        fieldPaddingVertical: PropTypes.number,
        fieldWidth: PropTypes.number,
        fieldMargin: PropTypes.number,
        fieldTextAlign: PropTypes.string,
        fieldFontSize: PropTypes.number,
        fieldColor: PropTypes.string,
        fieldBorderWidth: PropTypes.number
    }

    static defaultProps = {
        onChange: () => null,
        otpLength: 4,
        tintColor: '#FB6C6A',
        offTintColor: '#BBBCBE',
        containerStyle: {},
        cellStyle: {},
        editable: true, // Set the default value of editable to true
        fieldBorderRadius: 0,
        fieldPaddingVertical: 0,
        fieldWidth: 0,
        fieldMargin: 0,
        fieldTextAlign: '',
        fieldFontSize: 0,
        fieldColor: '',
        fieldBorderWidth: 0
    };

    textInput = null;

    state = {
        internalVal: this.props.value || this.props.defaultValue
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty('value') && nextProps.value !== this.state.internalVal) {
            this.setState({ internalVal: nextProps.value });
        }
    }

    componentDidMount() {
        this.focus();
    };

    handleChangeText = (val) => {
        const { onChange, otpLength } = this.props;
        let formattedVal = val;

        if (formattedVal.length > otpLength) {
            formattedVal = formattedVal.slice(0, otpLength); // Truncate extra characters
        }

        onChange(formattedVal);
        this.setState({ internalVal: formattedVal });
    };

    // public methods
    inputRef() {
        return this.textInput;
    }

    focus = () => {
        if (this.props.editable !== false) {
            this.textInput.focus();
        }
    };


    blur() {
        this.inputRef().blur();
    }

    isFocused() {
        return this.inputRef().isFocused();
    }

    clear() {
        this.setState({ internalVal: '' })
    }

    render() {
        const {
            containerStyle,
            cellStyle,
            tintColor,
            offTintColor,
            otpLength,
            fieldBorderRadius,
            fieldPaddingVertical,
            fieldWidth,
            fieldMargin,
            fieldTextAlign,
            fieldFontSize,
            fieldColor,
            fieldBorderWidth,
            ...otherProps
        } = this.props;

        const { internalVal } = this.state;

        // Create a variable to store the borderRadius value
        const cellBorderRadius = fieldBorderRadius;

        return (
            <View>

                <TextInput
                    cursorColor={'black'}
                    ref={input => (this.textInput = input)}
                    onChangeText={this.handleChangeText}
                    value={internalVal}
                    minLength={otpLength}
                    maxLength={otpLength}
                    returnKeyType="done"
                    keyboardType="numeric"
                    editable={this.props.editable}
                    autoFocus
                    onFocus={this.focus}
                    style={{ opacity: 0, position: 'absolute' }} // Add this line
                />

                <View style={[styles.container, containerStyle]}>
                    {Array(otpLength)
                        .fill()
                        .map((_, index) => (
                            <Text
                                key={index}
                                style={[
                                    styles.cell,
                                    cellStyle,
                                    {
                                        borderColor:
                                            internalVal && index === internalVal.length ? tintColor : offTintColor,
                                        borderRadius: cellBorderRadius,
                                        paddingVertical: fieldPaddingVertical,
                                        width: fieldWidth,
                                        margin: fieldMargin,
                                        textAlign: fieldTextAlign,
                                        fontSize: fieldFontSize,
                                        color: fieldColor,
                                        borderWidth: fieldBorderWidth
                                    }
                                ]}
                                onPress={() => this.textInput.focus()}
                            >
                                {internalVal && internalVal.length > index ? internalVal[index] : " "}
                            </Text>
                        ))}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default CustomInputOTP;
