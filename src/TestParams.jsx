import React, { Component } from 'react';
import PropTypes from 'prop-types';


const sampleData = {
    id: 1,
    name: 'Marcos',
    nested: {
        id: 11,
        name: 'Andrei'
    },
    array: [1, 2, 3]
};

const fetchPost = (url, data) => fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

const fetchPostFormData = (url, data) => {
    const parsedData = new FormData();
    parsedData.append( "json", JSON.stringify(data));
    return fetch("/echo/json/",
    {
        method: "POST",
        body: parsedData
    })
    .then(res => res.json());
}


const urls = [
    'test-post',
    'test-post-get-contents'
];

const tests = [
    {
        name: 'Regular test',
        test: fetchPost
    },
    {
        name: 'Form Data test',
        test: fetchPostFormData
    }
]

class TestParams extends Component {

    state = {
        url: urls[0],
        result: ''
    }

    handleChangeUrl= (event) => {
        this.setState({
            url: event.target.value
        });
    }

    runTest = test => () => {
        test.test(this.state.url, sampleData).then(result => {
            this.setState({result});
        })
    }

    render() {
        return (
            <div>
                <div>
                    {urls.map((url) => (
                        <div>
                            <label>
                                <input type="radio" value={url} onChange={this.handleChangeOptionUrl} checked={url === this.state.url} key={url}/>
                                {url}
                            </label>
                        </div>
                    ))}
                </div>
                <div>
                    {tests.map(test => (
                        <button key={test.name} onClick={this.runTest(test)}>{test.name}</button>
                    ))}
                </div>
                <div>
                    <pre>{this.state.result}</pre>
                </div>
            </div>
        );
    }
}

TestParams.propTypes = {

};

export default TestParams;