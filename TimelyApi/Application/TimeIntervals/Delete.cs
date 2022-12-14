using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using TimelyApi.Application.Core;
using TimelyApi.Data;

namespace TimelyApi.Application.TimeIntervals
{
    public class Delete
    {
         public class Command : IRequest<Result<Unit>>
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.TimeIntervals.FindAsync(request.id);

                if (activity == null){
                    return null;
                }

                _context.Remove(activity);

                bool result = await _context.SaveChangesAsync() > 0;

                if(!result){
                    return Result<Unit>.Failure("Failed to delete activity");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}