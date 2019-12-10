import test from 'ava'
import { Dispatch } from 'react'

import bindActionCreators = require('.')

interface Action<T extends string> {
	type: T
}

interface Yep extends Action<'YEP'> {
	payload: number
}

interface Nope extends Action<'NOPE'> {
	payload: Error
}

const yep = (d: Dispatch<Yep>) => (x: number, y: number) => {
	d({ type: 'YEP', payload: x + y })
}

const nope = (d: Dispatch<Nope>) => (message: string) => {
	d({ type: 'NOPE', payload: new Error(message) })
}

test('returns actions that dispatch expected actions when called', t => {
	const api = bindActionCreators({ yep, nope }, (...args: any[]) => {
		t.snapshot(args)
	})

	api.yep(5, 8)
	api.nope('no dice')
})
