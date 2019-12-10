function bindActionCreators<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TActionCreators extends Record<string, (dispatch: TDispatch) => any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TDispatch extends React.Dispatch<any>
>(actionCreators: TActionCreators, dispatch: TDispatch) {
	return (Object.keys(actionCreators) as Array<keyof TActionCreators>).reduce(
		(api, key) => {
			api[key] = actionCreators[key](dispatch)
			return api
		},
		{} as {
			[TKey in keyof TActionCreators]: ReturnType<TActionCreators[TKey]>
		},
	)
}

export = bindActionCreators
