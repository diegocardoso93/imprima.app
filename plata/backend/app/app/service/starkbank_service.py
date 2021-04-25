import datetime
import starkbank


class StarkbankService:
    def __init__(self):

        private_key_content = """
        -----BEGIN EC PARAMETERS-----
        BgUrgQQACg==
        -----END EC PARAMETERS-----
        -----BEGIN EC PRIVATE KEY-----
        MHQCAQEEIH0uMRJnTGjA31Nll6hQrd/aDq/A/RxSZd3MUPgZ+BpFoAcGBSuBBAAK
        oUQDQgAE6jbWf5bsDI0LR7xVzDouU5TgFOE5a8r4dxBVZ73Po+mrd88GYbWJcTzf
        yQvT+OkN2JcpHdQKFKGeCgRALHeE9Q==
        -----END EC PRIVATE KEY-----
        """

        project = starkbank.Project(
            environment="sandbox",
            id="6526563038265344",
            private_key=private_key_content
        )

        starkbank.user = project

    def create_invoice(self):

        invoices = starkbank.invoice.create([
            starkbank.Invoice(
                amount=2000,
                descriptions=[
                    {'key': 'Produto', 'value': 'Caneca personalizada'},
                    {'key': 'Vendedor', 'value': 'HDA Personalizações'},
                ],
                due=datetime.datetime.now() + datetime.timedelta(hours=4),
                expiration=0,
                name="Diego Cardoso",
                tags=['caneca', 'HDA Personalizações'],
                tax_id="03149062071",
                fine=0,
                interest=0
            )
        ])

        for invoice in invoices:
            print(invoice)

        return invoices

    def transfer(self):

        transfers = starkbank.transfer.create([
            starkbank.Transfer(
                amount=2650,
                tax_id="03149062071",
                name="Saque imprima",
                bank_code="18236120",
                branch_code="0001",
                account_number="590606-3",
                external_id="my-external-id",
                tags=["daenerys", "invoice/1234"]
            )
        ])

        for transfer in transfers:
            print(transfer)

        return transfers
