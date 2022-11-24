export async function handle(state, action) {
  const input = action.input;
  const caller = action.caller;

  if (input.function === 'train') {
    const manager = new SmartWeave.extensions.NlpManager({
      languages: ['en'], forceNER: true, nlu: { log: true }
    });

    if (state.model) {
      manager.import(state.model);
    }
    

    state.data.forEach(d => {
      if (d.type === 'document') {
          manager.addDocument(d.lang, d.content, d.category);
      } else {
          manager.addAnswer(d.lang, d.category, d.content);
      }
    })

    await manager.train();

    state.data = [];
    state.model = manager.export();
     
    return { state };
  }

  if (input.function === 'addData') {
    state.data.push(input.dataItem); 
    return { state };
  }  

  if (input.function === 'process') {
    const manager = new SmartWeave.extensions.NlpManager({
      languages: ['en'], forceNER: true, nlu: { log: true }
    });  
    
    if (state.model) {
      manager.import(state.model);
    } else {
      throw new ContractError(`Model is not trained yet"`);
    }

    const response = await manager.process(input.lang, input.text);

    return { result: response };
      
  }

  throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
}
