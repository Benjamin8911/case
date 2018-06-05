pragma solidity ^ 0.4.18;
contract property {
    //关键字“public”使变量能从合约外部访问。
    address public minter;
    // mapping (address => uint) public balances;

    struct Funder {

        uint tokenNumber;

        string tokenName;

        uint tokenSpace;
    }

    event Deposit(address sender, address publicAddress, uint tokenNumber, string tokenName);

    function property() public {
        minter = msg.sender;
    }

    mapping(address => mapping(uint => Funder)) public Funderss;

    function events(address _publicAddress, uint _tokenNumber, string _tokenName, uint _tokenspace) public {

        Funderss[_publicAddress][_tokenspace] = Funder(_tokenNumber, _tokenName, _tokenspace);
        Deposit(msg.sender, _publicAddress, _tokenNumber, _tokenName);

    }

    function setAll(address _publicAddress, uint _tokenNumber, string _tokenName, uint _tokenspace) public returns(bool fals) {

        Funderss[_publicAddress][_tokenspace] = Funder(_tokenNumber, _tokenName, _tokenspace);
        Deposit(msg.sender, _publicAddress, _tokenNumber, _tokenName);
        return true;
    }

    function isTokenName(address _publicAddress, uint _tokenspace) public constant returns(bool fals) {
        if (Funderss[_publicAddress][_tokenspace].tokenSpace != _tokenspace) {
            return true;
        }

        return false;
    }

    function minusAll(address _publicAddress, uint _tokenNumber, string _tokenName, uint _tokenspace) public returns(bool fals) {
        if (Funderss[_publicAddress][_tokenspace].tokenNumber < _tokenNumber) return;

        //  balances[msg.sender] -= _tokenNumber;
        //  balances[_publicAddress] += _tokenNumber;
        Funderss[_publicAddress][_tokenspace].tokenNumber -= _tokenNumber;
        Funderss[_publicAddress][_tokenspace] = Funder(Funderss[_publicAddress][_tokenspace].tokenNumber, _tokenName, _tokenspace);

        Deposit(msg.sender, _publicAddress, Funderss[_publicAddress][_tokenspace].tokenNumber, Funderss[_publicAddress][_tokenspace].tokenName);

        return true;
    }

    function addAll(address _publicAddress, uint _tokenNumber, string _tokenName, uint _tokenspace) public returns(bool fals) {
        //if (Funderss[_publicAddress][_tokenspace].tokenNumber < _tokenNumber) return;
        // balances[msg.sender] += _tokenNumber;
        // balances[_publicAddress] -= _tokenNumber;

        Funderss[_publicAddress][_tokenspace].tokenNumber += _tokenNumber;
        Funderss[_publicAddress][_tokenspace] = Funder(Funderss[_publicAddress][_tokenspace].tokenNumber, _tokenName, _tokenspace);

        Deposit(msg.sender, _publicAddress, Funderss[_publicAddress][_tokenspace].tokenNumber, Funderss[_publicAddress][_tokenspace].tokenName);

        return true;
    }

    function getTokenNumber(address _publicAddresss, uint _tokenspace) public constant returns(uint tokenNumber) {

        return Funderss[_publicAddresss][_tokenspace].tokenNumber;
    }

    function getTokenName(address _publicAddress, uint _tokenspace) public constant returns(string tokenName) {

        return Funderss[_publicAddress][_tokenspace].tokenName;
    }
}