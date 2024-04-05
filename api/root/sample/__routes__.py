from root.sample.sampleGet import SampleGetRoute
from . import sample_api

sample_api.add_resource(SampleGetRoute, "/sample/get")
# sample_api.add_resource(SamplePostRoute, "/sample/post")
# sample_api.add_resource(SamplePutRoute, "/sample/put")
# sample_api.add_resource(SampleDeleteRoute, "/sample/delete")
