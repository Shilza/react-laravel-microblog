import {connect} from 'react-redux'
import {ResponsiveContainer} from './ResponsiveContainer'

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
    }
};

export default connect(mapStateToProps)(ResponsiveContainer);