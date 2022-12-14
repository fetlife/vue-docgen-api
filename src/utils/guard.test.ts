import {
	isCommentNode,
	isBaseElementNode,
	isDirectiveNode,
	isAttributeNode,
	isSimpleExpressionNode,
	isCompoundExpressionNode,
	isInterpolationNode,
	isTextNode
} from './guards'

describe('guards', () => {
	it('should return false when null', () => {
		expect(isTextNode()).toBeFalsy()
		expect(isCommentNode()).toBeFalsy()
		expect(isBaseElementNode()).toBeFalsy()
		expect(isDirectiveNode()).toBeFalsy()
		expect(isAttributeNode()).toBeFalsy()
		expect(isSimpleExpressionNode()).toBeFalsy()
		expect(isCompoundExpressionNode()).toBeFalsy()
		expect(isInterpolationNode()).toBeFalsy()
	})
})
