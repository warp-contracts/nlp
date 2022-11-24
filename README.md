# NLP

An example of Machine Learning Warp smart contracts


## Getting started

1. Install necessary dependencies

    ```
    yarn install
    ```

2. Build the contract

    ```
    yarn build
    ```

3. Deploy contract and train model

    ```
    yarn deploy
    ```

4. Play with the model providing different inputs

    ```
    yarn interact
    ```


##  How it works

The project is built using [Warp contracts](https://github.com/warp-contracts) and the open sources NLP (Nature Language Processing) library [NLP.js](https://github.com/axa-group/nlp.js). The combination was possible thanks to the newly introduced [plugin system](https://github.com/warp-contracts/warp-contracts-plugins) for Warp contracts.  

The main contract consists of 3 functions: 

### addData(dataItem)

Which persists a data item in the contract's state that could be used for training

### train()

Process all of the stored data items to train the model 

### getAswer(input)

Evaluates the trained model against the *input* parameter 

## Why using smart-contracts for ML?

1. Transparency
Users can audit how the model was trained and on which data sources
2. Incentivisation
Actors providing data that improves the quality of the model could be automatically rewarded
3. Accessibility & Interoperability
The model could be natively used from other smart contracts
4. Permanence
The model is stored on Arweave and will remain operational without incurring additional maintenance costs

##  Future work

This project is just a proof of concept how [Warp contracts](https://github.com/warp-contracts) may facilitate the deployment of machine learning projects. In the future will be interesting to explore the following areas: 

1. Privacy preserving learning (provision of sensitive data) 
2. Federated learning (different models combining state to achieve better performance)
3. Robust economic incentives (rewarding users for high-quality inputs)


